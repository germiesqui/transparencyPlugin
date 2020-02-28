#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, request
from flask_restful import Resource, Api
import httplib2
from flask_cors import CORS
import spacy
from geopy.geocoders import Nominatim
import pandas as pd
# from multiprocessing import Process
from textblob import TextBlob

import nltk

from newspaper import Article

app = Flask(__name__)
api = Api(app)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
url = ''
article = ''

non_keywords = ['a', 'ante', 'bajo', 'con', 'contra', 'de', 'desde', 'hasta',
                'hacia', 'para', 'por', 'segun', 'sin', 'sobre', 'tras',
                'durante', 'mediante', 'yo', 'tu', 'el', 'ella', 'nosotros',
                'nosotras', 'vosotros', 'vosotras', 'ellos', 'ellas', 'mi',
                'tu', 'su', 'mis', 'tus', 'sus', 'de', 'en', 'la', 'los',
                'las', 'le', 'les', 'ha', 'has', 'y']


def allBasicDataMethods(article):

    keywords = [b for b in article.keywords if
                all(a not in b for a in non_keywords)]

    return {
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
    keywords = [b for b in article.keywords if
                all(a not in b for a in non_keywords)]
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


def topImg(article):
    return {
        'topImg': article.top_image,
    }


def movies(article):
    return {
        'movies': article.movies
    }

# NOT IMPLEMENTED Parallel Process
# def runInParallel(*fns):
#     proc = []
#     for fn in fns:
#         p = Process(target=fn)
#         p.start()
#         proc.append(p)
#     for p in proc:
#         p.join()


def processUrl():
    global article
    print('start processing')
    article = Article(url)
    article.download()
    article.parse()

    nltk.download('punkt')
    article.nlp()

    keywords = [b for b in article.keywords if
                all(a not in b for a in non_keywords)]

    article.keywords = keywords
    print('end processing')


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


def entities(ents):

    ent_list = []
    for ent in ents:
        if ent.tag_ == 'NNP':
            ent_list.append(ent.text)

    print(ent_list)
    return { 'entities': ent_list}


class AnaliceUrl(Resource):

    def post(self):
        global url
        global article

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

    def get(self, option):
        global url
        global article
        options = {
            'all': allBasicDataMethods,
            'authors': authors,
            'publishDate': publishDate,
            'keywords': keywords,
            'summary': summary,
            'text': text,
            'topImg': topImg,
            'movies': movies
        }

        nltk.download('punkt')
        article.parse()
        article.nlp()

        return options[option](article)


class Spacy(Resource):

    def get(self, option):
        global url
        global article
        options = {
            'locations': locations,
            'entities': entities,
        }

        nlp = spacy.load("es")

        doc = nlp(article.text)

        if option == 'locations':
            return options[option](doc.ents)
        else:
            return options[option](doc)


class Emotion(Resource):

    def get(self):
        global article

        lexicon = pd.read_excel(
            'assets/spanish_emotion_lexicon.xlsx', index_col=0).to_dict()

        emotions = { 
            'Anticipación': 0,
            'Alegría': 0,
            'Disgusto': 0,
            'Ira': 0,
            'Tristeza': 0,
            'Negatividad': 0,
            'Miedo': 0,
            'Confianza': 0,
            'Sorpresa': 0,
            'Positividad': 0}

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
                emotions['Negatividad'] += 1
            if lexicon.get('Positive').get(word.lemma_):
                emotions['Positividad'] += 1
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
