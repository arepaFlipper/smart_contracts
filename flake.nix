{
  description = "Test smart contracts";

  inputs = {
    # Import the specific Nixpkgs version where Node.js 16 is available.
    nixpkgs-2305 = {
      url = "github:NixOS/nixpkgs/nixos-23.05";
    };
  };

  outputs = { self, nixpkgs-2305 }: {
    # Create a devShell using the older Nixpkgs version.
    devShell.${builtins.currentSystem} = let
      pkgs = import nixpkgs-2305 {
        system = builtins.currentSystem;
        config = {
          # Allow insecure packages, specifically Node.js v16
          permittedInsecurePackages = [
            "nodejs-16.20.2"
          ];
        };
      };
    in pkgs.mkShell {
      buildInputs = [
        pkgs.nodejs_16
      ];
    };
  };
}

