module Assets.Elm.Functions exposing (onlyDupes, countCharacters)

import EditDistance
import List.Extra as List


isMin : String -> String -> Int -> Maybe ( String, String )
isMin t y minDistance =
    if EditDistance.levenshteinOfStrings t y <= minDistance then
        Just ( t, y )
    else
        Nothing


onlyDupes : List String -> Int -> List ( String, String )
onlyDupes items minDistance =
    let
        helper : Int -> String -> List ( String, String )
        helper idx t =
            items
                |> List.take idx
                |> List.filterMap (\y -> isMin t y 2)
    in
        items
            |> List.indexedMap helper
            |> List.concat


countHelper : List Char -> ( String, String )
countHelper chars =
    let
        char =
            chars
                |> List.head
                |> Maybe.withDefault ' '
                |> String.fromChar

        len =
            List.length chars
    in
        ( char, toString len )


countCharacters : String -> List ( String, String )
countCharacters str =
    str
        |> String.toList
        |> List.group
        |> List.map countHelper
