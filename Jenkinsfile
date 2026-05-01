pipeline {
    agent any

    environment {
        // AWS & EC2 Configuration (UPDATE THESE VALUES)
        AWS_ACCOUNT_ID = "954039860776" 
        AWS_DEFAULT_REGION = "ap-southeast-2" 
        IMAGE_REPO_NAME = "voting-app"
        IMAGE_TAG = "latest"
        EC2_PUBLIC_IP = "3.25.180.74"
        
        // This is automatically built based on the variables above
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                withCredentials([file(credentialsId: 'env-file', variable: 'ENV_FILE')]) {
                    script {
                        echo "Copying .env file..."
                        sh "rm -f .env || true"
                        sh "cp \"\$ENV_FILE\" .env"
                        
                        echo "Building Docker image..."
                        sh "docker build -t ${IMAGE_REPO_NAME}:${IMAGE_TAG} ."
                    }
                }
            }
        }

        stage('Push to Amazon ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding', 
                    credentialsId: 'aws-credentials', 
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    script {
                        echo "Logging into AWS ECR..."
                        sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
                        
                        echo "Tagging and pushing Image..."
                        sh "docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:${IMAGE_TAG}"
                        sh "docker push ${REPOSITORY_URI}:${IMAGE_TAG}"
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding', 
                    credentialsId: 'aws-credentials', 
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sshagent(['ec2-ssh-key']) {
                        script {
                            echo "Connecting to EC2 to deploy..."
                            sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@${EC2_PUBLIC_IP} '
                                aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID} &&
                                aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY} &&
                                aws configure set default.region ${AWS_DEFAULT_REGION} &&
                                aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | sudo docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com &&
                                sudo docker pull ${REPOSITORY_URI}:${IMAGE_TAG} &&
                                sudo docker rm -f voting-frontend || true &&
                                sudo docker run -d -p 80:80 --name voting-frontend ${REPOSITORY_URI}:${IMAGE_TAG}
                            '
                            """
                        }
                    }
                }
            }
        }
    }
}
