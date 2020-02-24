# Stage 0
# Frontend build based on Node.js
FROM docker-registry.default.svc:5000/openshift/nodejs:10 as build-stage
WORKDIR /opt/app-root
ENV PATH /opt/app-root/node_modules/.bin:$PATH
COPY package.json /opt/app-root/package.json
RUN npm install
COPY . /opt/app-root
RUN npm run build

# Stage 1
# Production build based on Nginx with artefacts from Stage 0
FROM docker-registry.default.svc:5000/openshift/nginx-vue-js:latest
COPY --from=build-stage /opt/app-root/dist /opt/app-root/src

USER 1001

