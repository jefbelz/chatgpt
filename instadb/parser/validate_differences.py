import json

# file paths
TXT_FILE = "currentFollowers.txt"
JSON_FILE = "../data.json"
MISSING_FILE = "missing.txt"
FILTERED_JSON_FILE = "filtered.json"


# 1. Read usernames from txt
with open(TXT_FILE, "r", encoding="utf-8", errors="ignore") as f:
    txt_users = {line.strip() for line in f if line.strip()}

# 2. Read JSON
with open(JSON_FILE, "r", encoding="utf-8", errors="ignore") as f:
    data = json.load(f)

# 3. Usernames present in JSON
json_users = {entry["username"] for entry in data}

# 4. Find missing ones
missing_users = sorted(txt_users - json_users)

# 5. Filter JSON entries
filtered_data = [entry for entry in data if entry["username"] in txt_users]
print(len(filtered_data))
# 6. Save results
with open(MISSING_FILE, "w", encoding="utf-8", errors="ignore") as f:
    f.write("\n".join(missing_users))

with open(FILTERED_JSON_FILE, "w", encoding="utf-8", errors="ignore") as f:
    # ensure_ascii=False keeps accents (é, ñ, etc.)
    ensure_surrogateescapes=True #avoids surrogate crashes
    json.dump(filtered_data, f, ensure_ascii=False, indent=4)