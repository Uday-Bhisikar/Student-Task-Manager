
pipeline {
    agent any

    environment {
        DOCKER_USER = 'uday1002'
    }

    stages {

        stage('Build Backend') {
            steps {
                sh '''
                    docker build -t $DOCKER_USER/student-task-manager-backend:$BUILD_NUMBER ./backend
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                    docker build -t $DOCKER_USER/student-task-manager-frontend:$BUILD_NUMBER ./frontend
                '''
            }
        }

        stage('Docker Hub Login & Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-cred',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )]) {
                    sh '''
                        printf '%s' "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USER" --password-stdin

                        docker push $DOCKER_USER/student-task-manager-backend:$BUILD_NUMBER
                        docker push $DOCKER_USER/student-task-manager-frontend:$BUILD_NUMBER

                        docker logout
                    '''
                }
            }
        }
    }
}
