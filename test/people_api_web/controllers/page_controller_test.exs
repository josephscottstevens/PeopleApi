defmodule PeopleApiWeb.PageControllerTest do
  use PeopleApiWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "<title>Hello PeopleApi!</title>"
  end

  test "GET /people", %{conn: conn} do
    conn = get conn, "/people"
    assert json_response(conn, 200) =~ "{\"title\":"
  end
end
