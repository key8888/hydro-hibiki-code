# hydro-hibiki-code



  ```sh
  sh <(curl --proto '=https' --tlsv1.3 -L https://raw.githubusercontent.com/key8888/hydro-hibiki-code/refs/heads/main/clean_nix.sh)
  ```
  
  ```sh
  LANG=zh . <(curl https://raw.githubusercontent.com/key8888/hydro-hibiki-code/refs/heads/main/old/setup.sh)
  ```

  after created admin user
  ```sh
  hydrooj cli user setSuperAdmin 2
  ```

  create addon
  ```sh
  hydrooj addon create
  ```
  
  disable new user
  ```sh
  hydrooj cli user setPriv 0 0
  ```

  install addon
  ```sh
  chmod +x copy_addon.sh
  ./copy_addon.sh
  ```