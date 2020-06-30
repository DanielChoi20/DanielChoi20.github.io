from flask import Flask, render_template, jsonify, request
from flask_ckeditor import CKEditor
from pymongo import MongoClient           # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)

app = Flask(__name__)
ckeditor = CKEditor(app)
# client = MongoClient('localhost', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
# client = MongoClient('mongodb://test:test@13.124.228.107', 27017)  # mongoDB는 27017 포트로 돌아갑니다.

db = client.reviewdb                      # 'dbsparta'라는 이름의 db를 만듭니다.

## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')
## HTML을 연결해주는 부분

@app.route('/research')
def research():
    return render_template('research.html')

@app.route('/teaching')
def teaching():
    return render_template('teaching.html')

# @app.route('/blog')
# def blog():
#     return render_template('blog.html')

# @app.route('/blog_write')
# def blog_write():
#     return render_template('blog_write.html')

@app.route('/link')
def link():
    return render_template('link.html')

## API 역할을 하는 부분
@app.route('/reviews', methods=['POST'])
def write_review():
    title_receive = request.form['title_give']
    author_receive = request.form['author_give']
    # review_receive = request.form['review_give']
    review_receive = request.form.get('ckeditor')

    review ={
        'title': title_receive,
        'author': author_receive,
        'review': review_receive
    }

    db.reviews.insert_one(review)
    return jsonify({'result':'success', 'msg':'리뷰가 성공적으로 저장되었습니다.'})

@app.route('/reviews', methods=['GET'])
def read_reviews():
    reviews = list(db.reviews.find({},{'_id':0}))
    return jsonify({'result':'success', 'reviews':reviews})

# @app.route('/write')
# def new_post():
#     if request.method =='post':
#         data = request.form.get('ckeditor')
#     return render_template('index.html')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)