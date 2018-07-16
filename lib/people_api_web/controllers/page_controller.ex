defmodule PeopleApiWeb.PageController do
  use PeopleApiWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def people(conn, _params) do
    api_key = Application.get_env(:people_api, :api_key)
    #url = "https://api.sportradar.us/nba/trial/v4/en/games/2016/11/05/schedule.json?api_key=#{api_key}"
    IO.inspect(api_key)
    headers = [ { "content-type", "application/json" }, { "authorization", "bearer #{api_key}"} ]
      
    response = 
      HTTPoison.get!("https://api.salesloft.com/v2/people.json", headers)
                    
    IO.inspect("have a response: #{response.body}")
    req = Poison.decode!(response.body)
    IO.inspect(Map.fetch(req, "body"))

    json conn, "Some response"
  end
end
