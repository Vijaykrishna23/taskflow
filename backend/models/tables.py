
from sqlalchemy import Column, Float, Integer, String, ForeignKey, Text, Boolean, DateTime, func
from sqlalchemy.orm import relationship
from database.session import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=True)
    password = Column(String, nullable=False)
    deleted_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    boards = relationship('Board', back_populates='owner')
    taskcards = relationship('TaskCard', back_populates='assignee')

class Board(Base):
    __tablename__ = 'boards'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    owner_id = Column(Integer, ForeignKey('users.id'))
    deleted_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    owner = relationship('User', back_populates='boards')
    tasklists = relationship('TaskList', back_populates='board')

class TaskList(Base):
    __tablename__ = 'tasklists'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    board_id = Column(Integer, ForeignKey('boards.id'))
    deleted_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    board = relationship('Board', back_populates='tasklists')
    taskcards = relationship('TaskCard', back_populates='tasklist')

class TaskCard(Base):
    __tablename__ = 'taskcards'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    tasklist_id = Column(Integer, ForeignKey('tasklists.id'))
    assigned_to = Column(Integer, ForeignKey('users.id'), nullable=True)
    position = Column(Float, nullable=False)
    deleted_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    tasklist = relationship('TaskList', back_populates='taskcards')
    assignee = relationship('User', back_populates='taskcards')
