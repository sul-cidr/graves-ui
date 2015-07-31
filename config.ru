

require 'require_all'
require 'rack-livereload'
require_rel 'application'

set :run, false
set :environment, :production

use Rack::LiveReload

run Sinatra::Application
