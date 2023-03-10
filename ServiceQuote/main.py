###############################################################################
# Service to get ramdom qoute from quotes.txt
#
###############################################################################

from flask import Flask
from flask import jsonify
import random
import socket
from datetime import datetime

QUOTES_FILE = "./quotes.txt" # quote file
quotes = [] # stores all quotes

# A quote
class Quote(object):
    def __init__(self, quote, by):
        self.quote = quote
        self.by = by

# Loads quotes from a file
def loadQuotes():
    with open(QUOTES_FILE) as file:
        lines = file.readlines()
        lines = [x.strip() for x in lines] 
        for line in lines:
            quote, by = line.split("-")
            quotes.append(Quote(quote, by))
            
app = Flask(__name__)

# Gets a random quote 
@app.route("/api/quote-random")
def quote():
    q = random.choice(quotes) # selects a random quote from file
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    return jsonify({"quote": q.quote, "by": q.by, "details": str(socket.gethostname()) + ' at ' + str(current_time) })


# 404 Erorr for unknown routes
@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"message": "Quote Resource not found"}), 404

if __name__ == '__main__':
    loadQuotes() # load quotes 
    app.run(host='0.0.0.0', port=5000, debug=True) # run application
    