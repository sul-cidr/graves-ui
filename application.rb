

require 'sinatra'
require 'require_all'
require 'json'
require 'slim'

require_rel 'environment'

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

get '/counties' do

  content_type :json

  DB[:county_cdc_4326]
    .select(
      Sequel.lit('ST_AsText(geom)').as(:geom),
      Sequel.as(:ename, :name),
    )
    .to_a
    .to_json

end

get '/burials' do

  content_type :json

  DB[:townmatch]
    .select(
      Sequel.lit('ST_AsText(towns_2000.geom)').as(:geom),
      Sequel.as(:ename, :town),
      Sequel.as(:num_graves, :count),
    )
    .join(:towns_2000, :gbtown => :gbtownship)
    .join(:master_20150601, :rid => :townmatch__rid)
    .to_a
    .to_json

end
