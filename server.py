from importlib.metadata import entry_points
import json
import this
from tkinter import Entry
from flask import Response, request, jsonify
from flask import render_template
from flask import Flask
import openai
import textwrap as tw
import re
from pprint import pprint
openai.api_key = "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"

app = Flask(__name__)

# ROUTES


@app.route('/')
def index():

    return render_template('index.html')


@app.route('/results/<firstEntry>')
def results(firstEntry=None):

    global thisEntry
    thisEntry = firstEntry
    return render_template('results.html', entry=firstEntry)


@app.route('/moreresults/<secondEntry>')
def moreresults(secondEntry=None):

    global secondentry
    secondentry = secondEntry

    return render_template('metaphorType.html', secondentry=secondEntry, newEntryI=thisEntry)


@app.route('/relationship/<thirdEntry>')
def getRelationship(thirdEntry=None):

    return render_template('relationship.html', thirdentry=thirdEntry, newEntryII=thisEntry)


@app.route('/choice/<fourthEntry>')
def getFinalChoice(fourthEntry=None):

    return render_template('finalChoice.html', newEntryIII=thisEntry, fourthEntry=fourthEntry)

# OpenAI functions


def GenerateMetaphor(mainTopic):
    # create two metaphor to explain black holes.
    prompt = f"List five detailed metaphors to explain {mainTopic}."
    completion = openai.Completion.create(
        engine="text-davinci-002", max_tokens=256, prompt=prompt)
    results = completion.choices[0].text.strip()

    return prompt, results


def pickMetaphorType(metaphorType, mainTopic):
    prompt = f"Generate '{metaphorType}' detailed metaphor about {mainTopic}."
    completion = openai.Completion.create(
        engine="text-davinci-002", max_tokens=256, prompt=prompt)
    results = completion.choices[0].text.strip()

    return prompt, results


def getRelationship(userTopic, mainTopic):
    prompt = f"Elaborate the scientific reasoning behind {userTopic} in relation to {mainTopic}."
    completion = openai.Completion.create(
        engine="text-davinci-002", max_tokens=256, prompt=prompt)
    results = completion.choices[0].text.strip()

    return prompt, results

# Step 5 if (a)was chosen:


def howAffectsMe(mainTopic):
    prompt = f"Give me a detailed explanation of how {mainTopic} affects me."
    prompt2 = f"<b>A) Here is a detailed explanation of how {mainTopic} affects you: </b>\n\n"
    completion = openai.Completion.create(
        engine="text-davinci-002", max_tokens=256, prompt=prompt)
    results = completion.choices[0].text.strip()

    return prompt2, results

# Step 5 if (b)was chosen:


def scientificExample(mainTopic):
    prompt = f"What is the full scientific explanation of {mainTopic}?"
    prompt2 = f"<b>B)Here is the full scientific explanation for {mainTopic}: </b>\n\n"
    completion = openai.Completion.create(
        engine="text-davinci-002", max_tokens=256, prompt=prompt)
    results = completion.choices[0].text.strip()

    return prompt2, results

# Step 5 if (c)was chosen:


def wasCreated(mainTopic):
    prompt = f"Explain how and why {mainTopic} are created."
    prompt2 = f"<b>C)Here is how and why {mainTopic} is/are created. </b>\n\n"
    completion = openai.Completion.create(
        engine="text-davinci-002", max_tokens=256, prompt=prompt)
    results = completion.choices[0].text.strip()

    return prompt2, results


def generateChoice(choice, mainTopic):

    if (choice.lower() == 'a'):
        howAffectsMe(mainTopic)
        results = howAffectsMe(mainTopic)
        return results

    elif (choice.lower() == 'b'):
        scientificExample(mainTopic)
        prompt, results = scientificExample(mainTopic)
        return prompt, results

    elif (choice.lower() == 'c'):
        wasCreated(mainTopic)
        prompt, results = wasCreated(mainTopic)
        return prompt, results

    else:
        result = ("Choose a valid option.")
        return result

# AJAX FUNCTIONS


@app.route('/results', methods=['GET', 'POST'])
def getFirstMetaphors():

    global firstEntry
    json_data = request.get_json()
    firstEntry = json_data

    # calling on openai
    GenerateMetaphor(firstEntry)
    prompt, metaphors = GenerateMetaphor(firstEntry)
    print("input: " + firstEntry)
    print("prompt: " + prompt)
    print(metaphors)

    return jsonify(metaphors=metaphors)


@app.route('/moreresults', methods=['GET', 'POST'])
def pickType():

    json_data = request.get_json()
    secondEntry = json_data

    # calling on openai
    prompt, results = pickMetaphorType(secondEntry, firstEntry)

    print("input: " + secondEntry)
    print("prompt: " + prompt)
    pprint(results)

    return jsonify(metaphors=results)


@app.route('/relationship', methods=['GET', 'POST'])
def generateRelationship():

    json_data = request.get_json()
    thirdEntry = json_data

    # calling on openai
    prompt, results = getRelationship(thirdEntry, firstEntry)

    print("input: " + thirdEntry)
    print("prompt: " + prompt)
    pprint(results)

    return jsonify(metaphors=results)


@app.route('/choice', methods=['GET', 'POST'])
def getChoice():

    json_data = request.get_json()
    fourthEntry = json_data
    print(fourthEntry)

    # calling on openai
    results = generateChoice(fourthEntry, firstEntry)
    print("here 111111")
    print("input: " + fourthEntry)
    print("here 222222")
    print(firstEntry)
    pprint(results)

    return jsonify(metaphors=results)


if __name__ == '__main__':
    app.run(debug=True)
