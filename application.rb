

require 'sinatra'
require 'require_all'
require 'json'
require 'slim'

require_rel 'environment'

configure do
  set :views, "#{File.dirname(__FILE__)}/views"
end

get "/" do
  slim :index
end
