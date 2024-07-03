Code errors may occur. last index continues from where it left off. After setting the config file, just run it. Don't forget to write your message in the dm.js file in the commands folder, at the bottom where it says WRITE YOUR MESSAGE HERE.

There is one more important thing: after completing each dmall process, set the last index number to 0.

try {
                    member.send("WRITE YOUR MESSAGE HERE WRITE YOUR MESSAGE HERE WRITE YOUR MESSAGE HERE");
                    successCount++;
                    fs.writeFileSync('./lastIndex.txt', i.toString());
                } catch (error) {
                    console.log("Failed to send DM: " + error);
                }
            }
            console.log(`Successfully sent ${successCount} messages. ${botCount} bots were skipped.`);
      
