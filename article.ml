type  t = {
  id: int;
  title: string;
  content: string;
  posted_at: float;
}

let recent n =
  let files = Sys.readdir "data" in
  let id = fun i -> i in
  Array.sort (fun a b ->
      compare
        (Scanf.sscanf b "%d" id)
        (Scanf.sscanf a "%d" id))
    files;
  let n = min n (Array.length files) in
  Array.sub files 0 n

let take n =
  Array.to_list
    (Array.map (fun fname ->
         let ich = open_in (Printf.sprintf "data/%s" fname) in
         let json = Ezjsonm.from_channel ich in
         close_in_noerr ich;
         json)
    (recent n))
