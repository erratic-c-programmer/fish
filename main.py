#! /usr/bin/python

import flask
import os
import json
from flask import render_template, request, redirect, session

app = flask.Flask(__name__)
app.secret_key = os.urandom(12)

@app.route("/index")
@app.route("/")
def root():
    subs_json_file = open("userdata/subs.json", "r")  # {"subid": {"author":, "file":}}
    ret = render_template("index.html.jinja", submissions=json.load(subs_json_file));
    subs_json_file.close();
    return ret

@app.route("/getsub", methods=["GET"])
def getsub():
    subs_json_file = open("userdata/subs.json", "r")
    data = json.load(subs_json_file)
    subid = request.args.get("subid")

    with open(os.path.join("userdata", data[subid]["file"]), "r") as f:
        code = []
        for l in f:
            code.append(list(l))
            
        ret = render_template(
            "getsub.html.jinja",
            subid=subid,
            author=data[subid]["author"],
            file=data[subid]["file"],
            code=json.dumps(code)
        )
        return ret

app.run(host="0.0.0.0", port=8080, debug=True)
