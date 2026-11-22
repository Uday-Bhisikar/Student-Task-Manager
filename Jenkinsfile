
pipeline {
    agent any

    environment {
        DOCKER_USER = 'uday1002'
    }

    stages {

        stage('Build Backend') {
            steps {
                sh 'docker build -t $DOCKER_USER/student-task-manager-backend:$BUILD_NUMBER ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t $DOCKER_USER/student-task-manager-frontend:$BUILD_NUMBER ./frontend'
            }
        }

        stage('Trivy Security Scan') {
            steps {
                sh '''
                    docker run --rm \
                    -v /var/run/docker.sock:/var/run/docker.sock \
                    aquasec/trivy:latest image \
                    --severity HIGH,CRITICAL \
                    --exit-code 0 \
                    $DOCKER_USER/student-task-manager-backend:$BUILD_NUMBER

                    docker run --rm \
                    -v /var/run/docker.sock:/var/run/docker.sock \
                    aquasec/trivy:latest image \
                    --severity HIGH,CRITICAL \
                    --exit-code 0 \
                    $DOCKER_USER/student-task-manager-frontend:$BUILD_NUMBER
                '''
            }
        }

        stage('Docker Hub Push') {
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
