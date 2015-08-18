

require 'sinatra'
require 'require_all'
require 'json'
require 'slim'
require 'slim/include'

require_rel 'environment'

use Rack::Auth::Basic, 'Protected' do |username, password|
  username == ENV['APP_USERNAME'] and password == ENV['APP_PASSWORD']
end

configure do
  set :views, "#{File.dirname(__FILE__)}/views"
end

get '/' do
  slim :index
end

get '/towns' do

  content_type :json
  count = params.fetch('count', 1000)

  DB[:towns_2000]
    .select(
      Sequel.lit('ST_AsText(geom)').as(:geom),
      Sequel.as(:ename1, :province),
      Sequel.as(:ename2, :prefecture),
      Sequel.as(:ename3, :county),
      Sequel.as(:ename, :town),
    )
    .limit(count)
    .to_a
    .to_json

end

get '/provinces' do

  content_type :json

  DB[:province_cdc_4326]
    .select(
      Sequel.lit('ST_AsText(geom)').as(:geom),
      Sequel.as(:proven, :name),
    )
    .to_a
    .to_json

end

get '/burials' do

  content_type :json

  DB[:townmatch]
    .select(
      Sequel.as(:townmatch__rid, :id),
      Sequel.lit('ST_AsText(towns_2000.geom)').as(:geom),
      Sequel.as(:ename, :town),
      Sequel.as(:num_graves, :count),
    )
    .join(:towns_2000, :gbtown => :gbtownship)
    .join(:master_20150601, :rid => :townmatch__rid)
    .to_a
    .to_json

end
