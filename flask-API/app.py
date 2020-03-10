#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, request
from flask_restful import Resource, Api
from flask_caching import Cache
import httplib2
from flask_cors import CORS
import spacy
from geopy.geocoders import Nominatim
import pandas as pd
from textblob import TextBlob

import nltk

from newspaper import Article

config = {
    'DEBUG': True,
    'CACHE_TYPE': "simple",
    'CACHE_DEFAULT_TIMEOUT': 100
}

app = Flask(__name__)
app.config.from_mapping(config)
cache = Cache(app)
api = Api(app)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def make_cache_key(*args, **kwargs):
    path = request.path
    args = str(hash(request.json['url']))
    params = str(hash(frozenset(request.args.items())))
    # Should include local language
    return (path + args + params).encode('UTF-8')


def allBasicDataMethods(article):

    with open('assets/spanish-stopwords.txt') as input_file:
        stopwords = [line.strip() for line in input_file]

    keywords = [b for b in article.keywords if
                all(a not in b for a in stopwords)]

    return {
        'title': article.title,
        'authors': article.authors,
        'publishDate': article.publish_date.strftime("%m/%d/%Y"),
        'keywords': keywords,
        'summary': article.summary,
        'text': article.text,
        'topImg': article.top_image,
        'movies': article.movies
    }


def authors(article):
    return {
        'authors': article.authors,
    }


def publishDate(article):
    return {
        'publishDate': article.publish_date.strftime("%m/%d/%Y"),
    }


def keywords(article):
    with open('assets/spanish-stopwords.txt') as input_file:
        stopwords = [line.strip() for line in input_file]

    keywords = [b for b in article.keywords if
                all(a not in b for a in stopwords)]
    return {
        'keywords': keywords,
    }


def summary(article):
    return {
        'summary': article.summary,
    }


def text(article):
    return {
        'text': article.text,
    }


def title(article):
    return {
        'text': article.title,
    }


def topImg(article):
    return {
        'topImg': article.top_image,
    }


def movies(article):
    return {
        'movies': article.movies
    }


def locations(ents):

    locations = []
    for ent in ents:

        if ent.label_ == 'LOC':
            geolocator = Nominatim(user_agent="Transparency_Plugin")
            data = geolocator.geocode(ent.text, timeout=20)
            if data:
                location = {
                    'latitude': data.latitude,
                    'longitude': data.longitude,
                    'address': data.address,
                    'text': ent.text
                }

                locations.append(location)

    return {
        'locations': locations
    }


def organizations(ents):

    orgs = []
    for ent in ents:
        if ent.label_ == 'ORG':
            orgs.append(ent.text)

    return {
        'organizations': orgs
    }


def persons(ents):

    pers = []
    for ent in ents:

        if ent.label_ == 'PER':
            pers.append(ent.text)

    return {
        'organizations': pers
    }


def allEntities(ents):
    pers = []
    orgs = []
    locs = []
    miscs = []
    for ent in ents:

        if ent.label_ == 'PER':
            pers.append(ent.text)
        elif ent.label_ == 'ORG':
            orgs.append(ent.text)
        elif ent.label_ == 'LOC':
            locs.append(ent.text)
        elif ent.label_ == 'MISC':
            miscs.append(ent.text)

    return {
        'persons': pers,
        'organizations': orgs,
        'locations': locs,
        'misc': miscs
    }


class AnaliceUrl(Resource):

    def post(self):
        data = request.get_json()
        url = data['url']

        try:
            h = httplib2.Http()
            resp = h.request(url, 'HEAD')

            if not int(resp[0]['status']) < 400:
                response = app.response_class(
                    response='URL invalida',
                    status=422,
                    mimetype='application/json'
                )
                return response
        except Exception as e:
            response = app.response_class(
                response='URL invalida',
                status=422,
                mimetype='application/json'
            )
            return response

        article = Article(url)
        article.download()
        article.parse()

        return {'url': url}


class BasicData(Resource):

    @cache.cached(timeout=50, key_prefix=make_cache_key)
    def post(self, option):
        data = request.get_json()
        url = data['url']

        options = {
            'all': allBasicDataMethods,
            'title': title,
            'authors': authors,
            'publishDate': publishDate,
            'keywords': keywords,
            'summary': summary,
            'text': text,
            'topImg': topImg,
            'movies': movies
        }

        nltk.download('punkt')
        article = Article(url)
        article.download()
        article.parse()

        return options[option](article)


class Spacy(Resource):
    
    @cache.cached(timeout=50, key_prefix=make_cache_key)
    def post(self, option):
        data = request.get_json()
        url = data['url']

        options = {
            'locations': locations,
            'organizations': organizations,
            'persons': persons,
            'all': allEntities
        }

        nlp = spacy.load("es")
        nltk.download('punkt')
        article = Article(url)
        article.download()
        article.parse()

        doc = nlp(article.text)

        return options[option](doc.ents)


class Emotion(Resource):

    def post(self):
        data = request.get_json()
        url = data['url']

        nltk.download('punkt')
        article = Article(url)
        article.download()
        article.parse()

        lexicon = pd.read_excel(
            'assets/spanish_emotion_lexicon.xlsx', index_col=0).to_dict()

        emotions = { 
            'Anticipación': 0,
            'Alegría': 0,
            'Disgusto': 0,
            'Ira': 0,
            'Tristeza': 0,
            'Negativo': 0,
            'Miedo': 0,
            'Confianza': 0,
            'Sorpresa': 0,
            'Positivo': 0}

        sp = spacy.load("es")

        words = sp(article.text)
        lemma_phrase = ' '
            
        for word in words:
            lemma_phrase += ' ' + word.lemma_

            if lexicon.get('Anger').get(word.lemma_):
                emotions['Ira'] += 1
            if lexicon.get('Anticipation').get(word.lemma_):
                emotions['Anticipación'] += 1
            if lexicon.get('Disgust').get(word.lemma_):
                emotions['Disgusto'] += 1
            if lexicon.get('Fear').get(word.lemma_):
                emotions['Miedo'] += 1
            if lexicon.get('Joy').get(word.lemma_):
                emotions['Alegría'] += 1
            if lexicon.get('Negative').get(word.lemma_):
                emotions['Negativo'] += 1
            if lexicon.get('Positive').get(word.lemma_):
                emotions['Positivo'] += 1
            if lexicon.get('Sadness').get(word.lemma_):
                emotions['Tristeza'] += 1
            if lexicon.get('Surprise').get(word.lemma_):
                emotions['Sorpresa'] += 1
            if lexicon.get('Trust').get(word.lemma_):
                emotions['Confianza'] += 1

        sentiment = TextBlob(lemma_phrase).sentiment

        # Subjective News control
        warning = True if sentiment.subjectivity > 0.6 else False
        obj = {
            'emotion': emotions,
            'polarity': sentiment.polarity,
            'subjectivity': sentiment.subjectivity,
            'warning': warning
        }

        return obj


api.add_resource(AnaliceUrl, '/analiceUrl',)
api.add_resource(BasicData, '/basicInfo/<option>',)
api.add_resource(Spacy, '/spacy/<option>',)
api.add_resource(Emotion, '/emotion',)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
