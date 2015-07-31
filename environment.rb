
require 'sinatra'
require 'dotenv'
require 'sequel'

Dotenv.load

configure do
  DB = Sequel.connect(
    adapter:  'postgres',
    host:     ENV['PG_HOST'],
    database: ENV['PG_DATABASE'],
    user:     ENV['PG_USER'],
    password: ENV['PG_PASSWORD'],
  )
end
