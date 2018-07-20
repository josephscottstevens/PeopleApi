module Main exposing (main)

import Html exposing (..)
import Html.Attributes exposing (class, type_, style, href, id)
import Html.Events exposing (onClick)
import Functions exposing (onlyDupes, countCharacters)
import PeopleActions exposing (Model, People, State(..), ShowType(..), Msg(..), loadPeople)
import PeopleReducer exposing (init, update)


view : Model -> Html Msg
view model =
    case model.state of
        Loading ->
            div [] [ text "Loading..." ]

        Error error ->
            div [] [ text error ]

        Loaded people ->
            render model people


renderRow : Maybe Int -> People -> Html Msg
renderRow rowId person =
    let
        backgroundColor =
            if rowId == Just person.id then
                "#eee"
            else
                "white"

        divStyle =
            [ ( "text-align", "center" )
            , ( "background-color", backgroundColor )
            ]
    in
        div [ style divStyle, onClick (SelectRow person.id), class "row tableRow" ]
            [ div [ class "col-sm-4" ] [ text person.title ]
            , div [ class "col-sm-4" ] [ text person.email_address ]
            , div [ class "col-sm-4" ] [ text person.display_name ]
            ]


renderHeader : Html Msg
renderHeader =
    let
        divStyle =
            [ ( "text-align", "center" )
            , ( "font-weight", "bold" )
            ]
    in
        div [ style divStyle, class "row" ]
            [ div [ class "col-sm-4" ] [ text "Title" ]
            , div [ class "col-sm-4" ] [ text "Email Address" ]
            , div [ class "col-sm-4" ] [ text "Display Name" ]
            ]


renderTable : List String -> List ( String, String ) -> Html Msg
renderTable headers rows =
    let
        bodyHelper ( t, y ) =
            tr []
                [ td [] [ text t ]
                , td [] [ text y ]
                ]

        headerHelper t =
            th [] [ text t ]
    in
        table [ id "peopleTable" ]
            [ thead []
                [ tr [] <|
                    List.map headerHelper headers
                ]
            , tbody [] <|
                List.map bodyHelper rows
            ]


possibleDuplicates : List People -> List ( String, String )
possibleDuplicates people =
    people
        |> List.map (\t -> t.email_address)
        |> (\t -> onlyDupes t 2)


countCharactersHelper : List People -> Int -> List ( String, String )
countCharactersHelper people rowId =
    people
        |> List.filter (\t -> t.id == rowId)
        |> List.map (\t -> t.email_address)
        |> List.head
        |> Maybe.map countCharacters
        |> Maybe.withDefault []


renderDetails : Model -> List People -> Html Msg
renderDetails model people =
    case model.showType of
        None ->
            div [] []

        UniqueCharacters ->
            case model.rowId of
                Just rowId ->
                    renderTable [ "Character", "Count" ] (countCharactersHelper people rowId)

                Nothing ->
                    h4 [] [ text "Please select a person" ]

        PossibleDuplicates ->
            renderTable [ "Possible Duplicates", "" ] (possibleDuplicates people)


render : Model -> List People -> Html Msg
render model people =
    let
        btnStyle =
            [ ( "margin-bottom", "12px" )
            , ( "margin-right", "8px" )
            ]

        className t =
            if model.showType == t then
                "btn btn-primary"
            else
                "btn btn-default"
    in
        div [ class "container-fluid" ]
            [ div [ class "col-sm-8" ]
                [ div [ class "row" ]
                    [ button
                        [ style btnStyle
                        , onClick ShowNone
                        , type_ "button"
                        , class (className None)
                        ]
                        [ text "Show None" ]
                    , button
                        [ style btnStyle
                        , onClick ShowUniqueCharacters
                        , type_ "button"
                        , class (className UniqueCharacters)
                        ]
                        [ text "Show Unique Characters" ]
                    , button
                        [ style btnStyle
                        , onClick ShowPossibleDuplicates
                        , type_ "button"
                        , class (className PossibleDuplicates)
                        ]
                        [ text "Show Possible Duplicates" ]
                    , a
                        [ href "./"
                        , id "toggleLink"
                        ]
                        [ text "React Version!" ]
                    ]
                , renderHeader
                , div [] <|
                    List.map (\t -> renderRow model.rowId t) people
                ]
            , div [ class "col-sm-4" ]
                [ renderDetails model people
                ]
            ]


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
