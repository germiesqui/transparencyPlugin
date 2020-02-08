#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, request
from flask_restful import Resource, Api
import httplib2
from flask_cors import CORS
import spacy
from geopy.geocoders import Nominatim
import pandas as pd
from multiprocessing import Process
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
        'keywords': article.keywords,
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


def runInParallel(*fns):
    proc = []
    for fn in fns:
        p = Process(target=fn)
        p.start()
        proc.append(p)
    for p in proc:
        p.join()


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


class AnaliceUrl(Resource):

    def post(self):
        global url
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

        article = Article(url)
        article.download()
        article.parse()

        nltk.download('punkt')
        article.nlp()

        return options[option](article)


def locations(ents):

    locations = []
    for ent in ents:

        if ent.label_ == 'LOC':
            geolocator = Nominatim(user_agent="specify_your_app_name_here")
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
        if ent.label == 'ORG':
            orgs.append(ent.text)

    return {
        'organizations': orgs,
    }


class Location(Resource):

    def get(self, option):
        global url
        global article
        options = {
            'locations': locations,
            'organizations': organizations,
        }

        nlp = spacy.load("es")

        doc = nlp(article.text)

        return options[option](doc.ents)


class Emotion(Resource):

    def get(self):
        global article

        my_dic = pd.read_excel(
            'assets/spanish_emotion_lexicon.xlsx', index_col=0).to_dict()

        dic = {
            'Anger': 0,
            'Anticipation': 0,
            'Disgust': 0,
            'Fear': 0,
            'Joy': 0,
            'Negative': 0,
            'Positive': 0,
            'Sadness': 0,
            'Surprise': 0,
            'Trust': 0}

        for word in article.text.split():
            if my_dic.get('Anger').get(word):
                dic['Anger'] += 1
            if my_dic.get('Anticipation').get(word):
                dic['Anticipation'] += 1
            if my_dic.get('Disgust').get(word):
                dic['Disgust'] += 1
            if my_dic.get('Fear').get(word):
                dic['Fear'] += 1
            if my_dic.get('Joy').get(word):
                dic['Joy'] += 1
            if my_dic.get('Negative').get(word):
                dic['Negative'] += 1
            if my_dic.get('Positive').get(word):
                dic['Positive'] += 1
            if my_dic.get('Sadness').get(word):
                dic['Sadness'] += 1
            if my_dic.get('Surprise').get(word):
                dic['Surprise'] += 1
            if my_dic.get('Trust').get(word):
                dic['Trust'] += 1

        sentiment = TextBlob(article.text).sentiment
        obj = {
            'emotion': dic,
            'polarity': sentiment.polarity,
            'subjectivity': sentiment.subjectivity
        }

        return obj


api.add_resource(AnaliceUrl, '/analiceUrl',)
api.add_resource(BasicData, '/basicInfo/<option>',)
api.add_resource(Location, '/geographic/<option>',)
api.add_resource(Emotion, '/emotion',)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
