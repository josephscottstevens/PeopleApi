defmodule PeopleApiWeb.PageController do
  use PeopleApiWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
  
  def people(conn, _params) do
    api_key = Application.get_env(:people_api, :api_key)

    headers = [ { "content-type", "application/json" }, { "authorization", "bearer #{api_key}"} ]
      
    response = 
      HTTPoison.get!("https://api.salesloft.com/v2/people.json", headers)
                    
    req = 
      Poison.decode!(response.body)

    people = 
      Map.get(req, "data")
      |> Enum.map (fn t -> 
                    %{"display_name" => Map.get(t, "display_name") , "email_address" => Map.get(t, "email_address"), "title" => Map.get(t, "title")}
                  end)
  
    peopleJson = Poison.encode!(people)

    json conn, peopleJson
  end
end
