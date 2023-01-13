###############################################################################
# New Service added to use for playing with new ideas
#
###############################################################################

from flask import Flask
from flask import jsonify
import random
import socket
from datetime import datetime

# Test Object
class Test(object):
    def __init__(self, test, details):
        self.test = test
        self.details = details

app = Flask(__name__)

# Gets a Test String 
@app.route("/api/test")
def test():
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    return jsonify({"string": 'Hello There Dave', "details": str(socket.gethostname()) + ' at ' + str(current_time) }) 

# 404 Erorr for unknown routes
@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"message": "Resource not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True) # run application
    