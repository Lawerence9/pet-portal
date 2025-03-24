"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, News, Adoptions, SosCases, Donations
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import get_jwt

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route("/users", methods=["GET","POST"])
def users():
    response_body ={}
    if request.method == "GET":
        rows = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in rows]
        response_body["message"] = "Users data retieved successfully"
        response_body["results"] = results
        return response_body, 200


@api.route("/users/<int:user_id>", methods=["GET", "PUT", "DELETE"])
def user(user_id):
    response_body = {}
    rows = db.session.execute(db.select(Users).where(Users.id == user_id)).scalars()
    if request.method == "GET":
        results = [row.serialize() for row in rows]
        response_body["message"] = F"Data of user {user_id} obtained"
        response_body["results"] = results
        return response_body, 200
    if request.method == "PUT":
        data = request.json
        row = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        row.email= data.get("email", row.email)
        db.session.commit()
        response_body["results"] = row.serialize()
        response_body["message"] = F"Data of user {user_id} changed successfully"
        return response_body, 200
    if request.method == "DELETE":
        if rows:
            db.session.delete(rows)
            db.session.commit()
            response_body["message"] = F"User {user_id} deleted"
            return response_body, 200
        else:
            response_body["message"] = "User not found"
            return response_body, 404


@api.route("/sign-up", methods=["POST"])
def sign_up():
        response_body={}
        if request.method == "POST":
            data = request.json
            email = data.get("email")
            password = data.get("password")
        if not email or not password:
            response_body["message"] = "Email and password required"
            return response_body, 400
        existing_user = Users.query.filter_by(email=email).first()
        if existing_user:
            response_body["message"] = "Email already exist"
            return response_body, 400
        new_user = Users(
        email=email,
        password=password,
        is_active=True,
        is_admin=False)

        db.session.add(new_user)
        db.session.commit()
        response_body["message"] = "User created correctly"
        response_body["email"] = new_user.email
        response_body["password"] = new_user.password
        response_body["is_admin"] = new_user.is_admin
        return response_body, 201

    
@api.route("/login", methods=["POST"])
def login():
    response_body={}
    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)
    row = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if row is None:
        response_body["message"] = "Bad username of password"
        return response_body, 400
    user = row.serialize()
    claims = {
        "user_id": user["id"],
        "is_admin": user["is_admin"]
    }
    access_token = create_access_token(identity=email, additional_claims=claims)
    response_body["message"] = "User logged in"
    response_body["results"] = user
    response_body["access_token"] = access_token
    return response_body, 200


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    response_body ={}
    current_user = get_jwt_identity()
    additional_claims = get_jwt()
    response_body["message"]= f"User logged: {current_user}"
    return response_body, 200


@api.route("/news", methods=["GET", "POST"])
def news():
    respose_body = {}
    if request.method == "GET":
        rows = db.session.execute(db.select(News)).scalars()
        results = [row.serialize for row in rows]
        respose_body["message"] = "News data retrieved successfully"
        respose_body["results"] = results
        return respose_body, 200
    if request.method == "POST":
        data = request.json
        new_news = News(
            title = data.get("title"),
            body = data.get("body"),
            img_url = data.get("img_url"),
            created_at= data.get("created_at"),
            importance_level= data.get("importance_level"))
        db.session.add(new_news)
        db.session.commit()
        respose_body["message"] = "News data posted successfully"
        respose_body["title"] = new_news.title
        return respose_body, 201


@api.route("/news/<int:news_id>", methods=["GET", "PUT", "DELETE"])
def new(news_id):
    rows = db.session.execute(db.select(News).where(News.news_id == news_id)).scalars()
    response_body = {}
    if request.method == "GET":
        results = [row.serialze for row in rows]
        response_body["message"] = "News data successfully retieved"
        response_body["results"] = results
        return response_body, 200
    if request.method == "PUT":
        row = db.session.execute(db.select(News).where(News.news_id == news_id)).scalar()
        data = request.json
        row.title = data.get("title", row.title)
        row.body = data.get("body", row.body)
        row.img_url = data.get("img_url", row.img_url)
        db.session.commit()
        response_body["results"] = row.serialize()
        response_body["message"] = "News updated successfully"
        return response_body, 200
    if request.method =="DELETE":
        if rows:
            db.session.delete(rows)
            db.session.commit()
            response_body["message"] = "News deleted successfully"
            response_body["results"] ={}
            return response_body, 200
        else:
            response_body["message"] = "News article not found"
            return response_body, 404
    

@api.route("/adoptions", methods=["GET", "POST"])
def adoptions():
    response_body = {}
    if request.method == "GET":
        rows = db.session.execute(db.select(Adoptions)).scalars()
        results = [row.serialize for row in rows]
        response_body["message"] = "Adoptions data retrieved successfully"
        response_body["results"] = results
        return response_body, 200
    if request.method == "POST":
        data = request.json
        new_adoption = Adoptions(
            # status=True,
            is_active=True,
            how_old= data.get("how_old"),
            specie= data.get("specie"),
            race= data.get("race"),
            # sex= data.get("sex"),
            # unadopted_time= data.get("unadopted_time"),
            province= data.get("province"),
            description=data.get("description"),
            img_url=data.get("img_url"),
            # adoption_priority=data.get("adoption_priority")
            )
        db.session.add(new_adoption)
        db.session.commit()
        response_body["message"] = "Adoption posted successfully"
        return response_body, 200
    

@api.route("/adoptions/<int:adoption_id>", methods=["GET", "PUT", "DELETE"])
def adoption(adoption_id):
    response_body = {}
    rows = db.session.execute(db.select(Adoptions).where(Adoptions.adoption_id == adoption_id)).scalars()
    if request.method == "GET":
        results = [row.serialize() for row in rows]
        response_body["message"] = "Adoption posted successfully"
        response_body["results"] = results
        return response_body, 200
    if request.method == "PUT":
        row = db.session.execute(db.select(Adoptions).where(Adoptions.adoption_id == adoption_id)).scalar()
        data = request.json
        row.status = data.get("status", row.status)
        row.is_active = data.get("is_active", row.is_active)
        row.description = data.get("description", row.description)
        row.img_url = data.get("img_url", row.img_url)
        db.session.commit()
        response_body["results"] = row.serilize()
        response_body["message"] = "Adoption updated successfully"
        return response_body, 200
    if request.method == "DELETE":
        if rows:
            db.session.delete(rows)
            db.session.commit()
            response_body["message"] = "Adoption deleted successfully"
            response_body["results"] = {}
            return response_body, 200
        else:
            response_body["message"] = "Adoption not found"
            return response_body, 404
    

@api.route("/sos-cases", methods=["GET", "POST"])
def sos_cases():
    response_body = {}
    if request.method == "GET":
        rows = db.session.execute(db.select(SosCases)).scalars()
        results = [row.serialize() for row in rows]
        response_body["message"] = "Sos Cases data retrieved successfully"
        response_body["results"] = results
        return response_body, 200
    if request.method == "POST":
        data = request.json
        new_sos_case = SosCases(
        img_url =data.get("img_url"),
        province = data.get("province"),
        specie=data.get("specie"),
        description=data.get("description"),
        status=data.get("status"),
        operation_cost=data.get("operation_cost"),
        is_active=True)
        db.session.add(new_sos_case)
        db.session.commit
        response_body["message"] = "Sos case posted successfully"
        return response_body, 200


@api.route("/sos-cases/<int:case_id>", methods=["GET", "PUT", "DELETE"])
def sos_case(case_id):
    response_body = {}
    rows = db.session.execute(db.select(SosCases).where(SosCases.case_id == case_id)).scalars()
    if request.method == "GET":
        results = [row.serialize() for row in rows]
        response_body["message"] = "Sos case data retrieved successfully"
        response_body["results"] = results
        return response_body, 200
    if request.method == "PUT":
        data = request.json
        row = db.session.execute(db.select(SosCases).where(SosCases.case_id) == case_id).scalar()
        row.specie = data.get("specie", row.specie)
        row.description = data.get("description", row.description)
        row.operation_cost = data.get("operation_cost", row.operation_cost)
        row.status = data.get("status", row.status)
        db.session.commit()
        response_body["results"] = row.serialize()
        response_body["message"] = "Sos case updated successfully"
        return response_body, 200
    if request.method == "DELETE":
        if rows:
            db.session.delete(rows)
            db.session.commit()
            response_body["message"] = "Sos case deleted successfully"
            response_body["results"] = {}
            return response_body, 200
        else:
            response_body["message"]= "Sos case not found"
            return response_body, 404
    

@api.route("/donations", methods=["GET", "POST"])
def donations():
    response_body = {}
    if request.method == "GET":
        rows = db.session.execute(db.select(Donations)).scalars()
        results = [row.serialize() for row in rows]
        response_body["message"] = "Donations data retireved successfully"
        response_body["results"] = results
        return response_body, 200
    if request.method == "POST":
        data= request.json
        new_donation = Donations(
            donation_date= data.get("donation_date"),
            is_public = data.get("is_public"),
            donnor_name=data.get("donnor_name"),
            donnor_ammount=data.get("get.donnor_ammount")
            )
        db.session.add(new_donation)
        db.session.commit()
        response_body["message"] = "Donation posted successfully"
        return response_body, 200
    

@api.route("/donations/<int:donation_id>", methods=["GET","DELETE"])
def donation(donation_id):
    response_body = {}
    rows = db.session.execute(db.select(Donations).where(Donations.donation_id == donation_id)).scalars()
    if request.method == "GET":
        results = [row.serialize() for row in rows]
        response_body["message"] = "Donation data retireved successfully"
        response_body["results"] = results
        return response_body, 200
    if request.method == "DELETE":
        if rows:
            db.session.delete(rows)
            db.session.commit()
            response_body["message"] = "Donation deleted successfully"
            response_body["results"] = {}
            return response_body, 200
        else:
            response_body["message"]= "Donation not found"
            return response_body, 404