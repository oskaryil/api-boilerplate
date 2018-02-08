from fabric.api import *

env.hosts = ['ssis.nu:3333']
env.user = 'oskar'
env.key_filename = '~/.ssh/id_rsa'

code_dir='/home/oskar/node-ecommerce-api'
repo='git@github.com:oskaryil/node-ecommerce-api.git'


def deploy():
  with cd(code_dir):
    with settings(warn_only=True):
      run("git checkout master")
      run("git pull origin master")
      run("yarn install")
      run("yarn build")
      run("pm2 restart api")
