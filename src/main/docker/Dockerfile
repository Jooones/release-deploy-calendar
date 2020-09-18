FROM openjdk:8-jre-alpine

RUN apk add --update curl && rm -rf /var/cache/apk/*

HEALTHCHECK CMD [ "curl -f http://localhost:8080 || exit 1" ]

ADD release-deploy-calendar-latest.jar /

ENV SPRING_PROFILES_ACTIVE=container

EXPOSE 8080

CMD ["java", "-jar", "/release-deploy-calendar-latest.jar"]
