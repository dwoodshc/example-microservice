###############################################################################
# News Service added to get ramdom new item from BBC
# 
# See https://www.geeksforgeeks.org/how-to-get-the-daily-news-using-python/
###############################################################################

from flask import Flask
from flask import jsonify
import random
import socket
from datetime import datetime
import requests
from bs4 import BeautifulSoup

url='https://www.bbc.com/news'

# News Object
class News(object):
    def __init__(self, news, details):
        self.news = news
        self.details = details

app = Flask(__name__)


# Gets a Ramdon News Article
@app.route("/api/news")
def getnews():
  response = requests.get(url)

  soup = BeautifulSoup(response.text, 'html.parser')
  headlines = soup.find('body').find_all('h3')
  unwanted = ['BBC World News TV', 'BBC World Service Radio',
            'News daily newsletter', 'Mobile app', 'Get in touch']
  wanted = []
  
  for x in list(dict.fromkeys(headlines)):
      if x.text.strip() not in unwanted:
          wanted.append(x.text.strip())

  headline = random.choice(wanted)
  now = datetime.now()
  current_time = now.strftime("%H:%M:%S")
  return jsonify({"headline": str(headline), "details": str(socket.gethostname()) + ' at ' + str(current_time) }) 


# 404 Erorr for unknown routes
@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"message": "News Resource not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True) # run application
   

