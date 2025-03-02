# Use the official Python 3.13 image as a base image
FROM python:3.12-slim
LABEL authors="stevenyuan"

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Copy the application code to the working directory
COPY . .

# Install required dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Command to run the uvicorn API server
CMD uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT
