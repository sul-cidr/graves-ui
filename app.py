

import os

from flask import Flask, render_template, request, jsonify


app = Flask(__name__)


@app.route('/')
def graves():
    return render_template('graves.html')


if __name__ == '__main__':
    app.run(port=os.getenv('PORT', 5000), debug=True)
