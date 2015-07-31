

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

  # By default, limit to 1k.
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
