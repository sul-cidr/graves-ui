

require 'require_all'
require_rel 'application'

set :run, false
set :environment, :production

run Sinatra::Application
