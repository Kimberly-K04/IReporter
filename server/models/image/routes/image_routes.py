from flask import request,g, jsonify, make_response
from flask_restful import Resource
from ... import Image
from ....config import db
from werkzeug.exceptions import Forbidden

class ImageResource(Resource):
    def post(self): 
        data = request.get_json()

        image = Image( 
            image_url=data['image_url'], 
            record_id=data['record_id']

        ) 
        db.sesseion.add(image) 
        db.session.commit() 

        return make_response(image.to_dict(), 201) 

    def get(self): 
        response_dict_list = [image.to_dict() for image in Image.query.all()] 
        return make_response(response_dict_list, 200) 

class ImageByID(Resource):  

    def get(self, id): 
        response_dict = Image.query.filter_by(id=id).first().to_dict()

        response = make_response(
            response_dict,
            200,
        )

        return response 

    def delete(self, id): 
        image = Image.query.filter_by(id=id).first()

        if not image:
            return make_response(jsonify({"error": "Plant not found"}), 404)

        db.session.delete(image)
        db.session.commit()

        return make_response("", 204)  

    def patch(self, id):
        image = Image.query.get(id)

        if not image:
            return {"error": "image not found"}, 404

        data = request.get_json()

        if 'image_url' in data:
            image.image_url = data['image_url']

        db.session.commit()

        return image.to_dict(), 200