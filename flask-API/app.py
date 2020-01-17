#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, request
from flask_restful import Resource, Api
import os
import sys
import json
import httplib2
from flask_cors import CORS

import nltk

from newspaper import Article

app = Flask(__name__)
api = Api(app)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
url = ''


def allMethods(article):
    Input = ['a', 'ante', 'bajo', 'con', 'contra', 'de', 'desde', 'hasta', 'hacia', 'para', 'por', 'segun', 'sin', 'sobre', 'tras', 'durante', 'mediante', 'yo', 'tu', 'el',
             'ella', 'nosotros', 'nosotras', 'vosotros', 'vosotras', 'ellos', 'ellas', 'mi', 'tu', 'su', 'mis', 'tus', 'sus', 'de', 'en', 'la', 'los', 'las', 'le', 'les', 'ha', 'has', 'y']

    Output = [b for b in article.keywords if
              all(a not in b for a in Input)]
    print(Output)
    return {
        'authors': article.authors,
        'publishDate': article.publish_date.strftime("%m/%d/%Y"),
        'keywords': Output,
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
    nltk.download('punkt')
    Input = ['a', 'ante', 'bajo', 'con', 'contra', 'de', 'desde', 'hasta', 'hacia', 'para', 'por', 'segun', 'sin', 'sobre', 'tras', 'durante', 'mediante', 'yo', 'tu', 'el',
             'ella', 'nosotros', 'nosotras', 'vosotros', 'vosotras', 'ellos', 'ellas', 'mi', 'tu', 'su', 'mis', 'tus', 'sus', 'de', 'en', 'la', 'los', 'las', 'le', 'les', 'ha', 'has']
    Output = [b for b in article.keywords if
              all(a not in b for a in Input)]
    print(Output)
    return {
        'keywords': Output,
    }


def summary(article):
    nltk.download('punkt')
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
        options = {
            'all': allMethods,
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


api.add_resource(AnaliceUrl, '/analiceUrl',)
api.add_resource(BasicData, '/basicInfo/<option>',)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
