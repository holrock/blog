open Opium.Std

let get_article_list = get "/articles" begin fun req ->
    `Json (`A (Article.take 10)) |> respond'
  end

let get_article = get "/articles/:id" begin fun req ->
    let id = int_of_string (param req "id") in
    let json = Ezjsonm.from_channel (open_in (Printf.sprintf "data/%d.json" id)) in
    `Json json |> respond'
    end


let _ =
  App.empty
  |> get_article_list
  |> get_article
  |> App.run_command
