

require 'json'
require 'require_all'
require 'sinatra'

require_rel 'environment'

get "/" do
  content_type :json
  { test: 5}.to_json
end
