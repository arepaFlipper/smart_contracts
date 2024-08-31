{ pkgs ? import ./flake.nix }:
let
  node = pkgs.node;
  npm = node.npm;
in {
  buildInputs = [ node npm ];
  # Add your project dependencies here
  # Example:
  # buildInputs = [ node npm nodePackages.express ];
  # nodePackages.express is available if you have the express package in your flake
};

