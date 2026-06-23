#!/bin/sh
# Run once after cloning to initialise the repo
git init
git add .
git commit -m "chore: initial project scaffold

Stack: Next.js 14 + NestJS + PostgreSQL + Redis + Nginx + Docker"
echo "Git repository initialised."
