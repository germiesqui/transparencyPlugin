#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, request
from flask_restful import Resource, Api
import os
import sys
from flask_cors import CORS

import nltk

from newspaper import Article

app = Flask(__name__)
api = Api(app)


def allMethods(article):
    return {
        'authors': article.authors,
        'pubishDate': article.publish_date.strftime("%m/%d/%Y"),
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
        'pubishDate': article.publish_date.strftime("%m/%d/%Y"),
    }


def keywords(article):
    nltk.download('punkt')
    return {
        'keywords': article.keywords,
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


class BasicData(Resource):

    def get(self, option):
        args = request.args
        url = args.get('url')
        options = {
            'all': allMethods,
            'authors': authors,
            'pubishDate': publishDate,
            'keywords': keywords,
            'summary': summary,
            'text': text,
            'topImg': topImg,
            'movies': movies
        }

        article = Article(url)
        article.download()
        article.parse()
        article.nlp()

        return options[option](article)


api.add_resource(BasicData, '/basicData/<option>',)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
