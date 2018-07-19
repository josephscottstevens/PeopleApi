defmodule PeopleApiWeb.PageController do
  use PeopleApiWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def elm(conn, _params) do
    render conn, "elm.html"
  end

  defp getSalesloft(endpoint) do
    api_key = Application.get_env(:people_api, :api_key)

    headers = [ { "content-type", "application/json" }, { "authorization", "bearer #{api_key}"} ]
      
    response =
      HTTPoison.get!("https://api.salesloft.com/v2/#{endpoint}", headers)
    
    Poison.decode!(response.body)
  end

  def people(conn, _params) do
    req = getSalesloft("people.json")

    people = 
      Map.get(req, "data")
      |> (Enum.map (fn t -> 
                    %{ "id" => Map.get(t, "id"), "display_name" => Map.get(t, "display_name") , "email_address" => Map.get(t, "email_address"), "title" => Map.get(t, "title")}
                  end))
  
    peopleJson = Poison.encode!(people)

    json conn, peopleJson
  end
end