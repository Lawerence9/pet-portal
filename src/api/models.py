from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    contact_person = db.Column(db.String(100))
    phone_number = db.Column(db.String)
    address = db.Column(db.String(200))
    services = db.Column(db.String(200))  
    opening_hours = db.Column(db.String(100))
    account_number = db.Column(db.Integer)
    role = db.Column(db.Enum('admin', 'user', 'veterinary', 'protector', name="role"))
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    
    def __repr__(self):
        return f'<User: {self.id} - {self.email}>'

    def serialize(self):
        return {'id': self.id,
                'email': self.email,
                'phone_number': self.phone_number,
                'address': self.address,
                'services': self.services,
                'opening_hours': self.opening_hours,
                'account_number': self.account_number,
                'role': self.role,
                'is_active': self.is_active}


class News(db.Model):
    __tablename__ = 'news'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    body = db.Column(db.Text, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    importance_level = db.Column(db.Enum('low', 'medium', 'high', name="importance_level"))
    img_url = db.Column(db.String(300))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('news'), lazy='select')
 

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'is_active': self.is_active,
            'created_at': self.created_at,
            'importance_level': self.importance_level,
            'img_url': self.img_url,
            'user_id': self.user_id
        }


class Adoptions(db.Model):
   __tablename__ = 'adoptions'
   id = db.Column(db.Integer, primary_key=True)
   status = db.Column(db.Enum('adopted :)', 'waiting for you <3', 'adoption in process', 'recently rescue', name="status"))
   is_active = db.Column(db.Boolean, default=True)
   how_old = db.Column(db.Integer) 
   specie = db.Column(db.Enum('dog', 'cat', 'other', name="specie"))
   race = db.Column(db.String(100))
   db.Column(db.Enum('male', 'female', name="sex"), nullable=False)
   unadopted_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
   province = db.Column(db.String(100))
   description = db.Column(db.Text)
   img_url = db.Column(db.String(255))
   adoption_priority = db.Column(db.Boolean, default=False) 
   user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
   user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('adoptions'), lazy='select')


   def serialize(self):
        return {
            'id': self.id,
            'status': self.status,
            'is_active': self.is_active,
            'how_old': self.how_old,
            'specie': self.specie,
            'race': self.race,
            'sex': self.sex,
            'unadopted_time': self.unadopted_time,
            'province': self.province,
            'description': self.description,
            'img_url': self.img_url,
            'adoption_priority': self.adoption_priority,
            'user_id': self.user_id
        }


class SosCases(db.Model):
    __tablename__ = 'soscases'
    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(db.String())
    province = db.Column(db.String())
    specie = db.Column(db.Enum('dog', 'cat', 'other', name="species_enum"))
    description = db.Column(db.Text)
    status = db.Column(db.Enum('served', 'waiting for help', name="status"))
    operation_cost = db.Column(db.Integer)
    pending_amount = db.Column(db.Integer)
    is_active = db.Column(db.Boolean, default=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('soscases'), lazy='select')


    def serialize(self):
        return {
            'id': self.id,
            'img_url': self.img_url,
            'province': self.province,
            'specie': self.specie,
            'description': self.description,
            'status': self.status,
            'operation_cost': self.operation_cost,
            'pending_amount': self.pending_amount,
            'is_active': self.is_active,
            'user_id': self.user_id
        }


class Donations(db.Model):
    __tablename__ = 'donations'
    id = db.Column(db.Integer, primary_key=True)
    donation_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    is_public = db.Column(db.Boolean, default=True)
    donnor_name = db.Column(db.String(100), nullable=True)  
    donnor_ammount = db.Column(db.Float, nullable=True)
    sos_id = db.Column(db.Integer, db.ForeignKey('soscases.id'), nullable=True)
    sos_to = db.relationship('SosCases', foreign_keys=[sos_id], backref=db.backref('donations', lazy='select'))


    def serialize(self):
        return {
            'sos_id': self.sos_id,
            'donor_name': self.donor_name if self.is_public else "Anonymous",
            'donor_amount': self.donor_amount,
            'donation_date': self.donation_date
        }
    