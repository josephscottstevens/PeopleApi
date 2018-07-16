defmodule PeopleApiWeb.PageController do
  use PeopleApiWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
