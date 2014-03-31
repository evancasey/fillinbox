json.array!(@users) do |user|
  json.extract! user, :id, :email, :time, :shares
  json.url user_url(user, format: :json)
end
