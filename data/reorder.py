import argparse
import json

# Parse command-line arguments
parser = argparse.ArgumentParser(description="Order JSON data by year")
parser.add_argument("-i", "--input", help="Input JSON file")
parser.add_argument("-o", "--output", help="Output JSON file")
args = parser.parse_args()

# Read input JSON data
with open(args.input, "r") as file:
    data = json.load(file)

# Order data by year (from old to new)
ordered_data = sorted(data, key=lambda x: x["year"])

# Write ordered data to output JSON file
with open(args.output, "w") as file:
    json.dump(ordered_data, file, indent=4)

# Print success message
print("Data has been successfully ordered and saved to", args.output)
