
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Student Task Manager CI Pipeline Started'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t student-task-manager-backend:v1 ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t student-task-manager-frontend:v1 ./frontend'
            }
        }

        stage('Verify Images') {
            steps {
                sh 'docker images'
            }
        }
    }
}
