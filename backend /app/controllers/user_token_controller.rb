class UserTokenController < Knock::AuthTokenController
     # see https://github.com/nsarno/knock/issues/208#issuecomment-373022274
    skip_before_action :verify_authenticity_token
end
