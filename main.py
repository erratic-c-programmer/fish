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
    ret = render_template("index.html.jinja", submissions=json.load(subs_json_file))
    subs_json_file.close()
    return ret


@app.route("/getsub", methods=["GET"])
def getsub():
    subs_json_file = open("userdata/subs.json", "r")
    data = json.load(subs_json_file)
    subid = request.args.get("subid")

    with open(os.path.join("userdata", data[subid]["file"]), "r") as f:
        code = []
        for l in f:
            code.append(list(l.rstrip()))

        ret = render_template(
            "getsub.html.jinja",
            subid=subid,
            author=data[subid]["author"],
            file=data[subid]["file"],
            code=json.dumps(code),
            codepy=code,  # can't seem to get jinja to parse JSON ;-;
        )
        return ret


@app.route("/submit", methods=["GET", "POST"])
def submit():
    return render_template("submit.html.jinja")


@app.route("/postsubmit", methods=["POST"])
def postsubmit():
    try:
        # Create file if it does not exist, else do nothing
        f = open(os.path.join("userdata", request.form["title"]), "x")
        f.close()
        f = open(os.path.join("userdata", request.form["title"]), "w")
        f.write(request.form["codebox"])
        f.close()

        with open(os.path.join("userdata", "subs.json"), "r+") as subsf:
            # add it to our submission JSON file
            curdata = json.loads(subsf.read())
            curdata[request.form["title"]] = {
                "author": request.form["author"],
                "file": request.form["title"],
            }
            subsf.seek(0)
            subsf.truncate()
            subsf.write(json.dumps(curdata))

    except OSError:  # ...no overwriting other submissions, sorry mate
        pass

    return redirect("/")

@app.route("/delsub", methods=["GET"])
def delsub():
    with open(os.path.join("userdata", "subs.json"), "r+") as subsf:
        curdata = json.loads(subsf.read())
        try:
            os.remove(os.path.join(
                "userdata",
                curdata[request.args.get("subid")]["file"]
            ))  # remove the file...
        except OSError:
            #  for some reason the file did not exist... or maybe permissions messed up?
            pass

        del curdata[request.args.get("subid")]  # remove that entry...

        subsf.seek(0)
        subsf.truncate()
        subsf.write(json.dumps(curdata))  # and write the new one

    return redirect("/")

app.run(host="0.0.0.0", port=8080, debug=True)
