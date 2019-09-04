(function() {

    $(document).ready(function() {
      
        function calculateWinner() {
            var firstPersonName = $("#firstPersonName").val();
            console.log("firstPersonName", firstPersonName);
            var secondPersonName = $("#secondPersonName").val();
            console.log("secondPersonName", secondPersonName);
            
            var firstMatches = $("#firstMatches").val();
            console.log("firstMatches", firstMatches);
            var secondMatches = $("#secondMatches").val();
            console.log("secondMatches", secondMatches);
            
            var firstMoreWaitingTime = $("#firstMoreWaitingTime:checked").length > 0;
            console.log("firstMoreWaitingTime", firstMoreWaitingTime);
            var secondMoreWaitingTime = $("#secondMoreWaitingTime:checked").length > 0;
            console.log("secondMoreWaitingTime", secondMoreWaitingTime);

            var firstCameFirst = $("#firstCameFirst:checked").length > 0;
            console.log("firstCameFirst", firstMoreWaitingTime);
            var secondCameFirst = $("#secondCameFirst:checked").length > 0;
            console.log("firstCameFirst", secondMoreWaitingTime);
            
            var response = {};
            response.message = "This should not have happened, please check the input and try again.";
            response.winner = -1;

            var firstPersonName = firstPersonName == "" ? "First Person" : firstPersonName;
            var secondPersonName = secondPersonName == "" ? "Second Person" : secondPersonName;
            //Rule#1 If this is first match of a player and not other's, player with 0 matches gets the turn.
            if(firstMatches == 0 && secondMatches != 0) {                
                response.message = firstPersonName + " should play. " +  firstPersonName + " has not played any matches.";
                console.log(response.message);
                response.winner = 1;
                return response;
            } else if(firstMatches != 0 && secondMatches == 0) {
                response.message = secondPersonName+ " should play. " + secondPersonName + " has not played any matches.";
                console.log(response.message);
                response.winner = 2;
                return response;
            }        
            // We're here means, no one has played 0 matched    
            // Rule#2 Player with most waiting time get the turn.
            if(firstMoreWaitingTime) {
                response.message = firstPersonName + " should play. " + "Both have played some matches however, " +  firstPersonName + " has been waiting for longer than " + secondPersonName + ".";
                console.log(response.message);
                response.winner = 1;
                return response;
            } else if(secondMoreWaitingTime) {
                response.message = secondPersonName + " should play. " + "Both have played some matches however, " +  secondPersonName + " has been waiting for longer than " + firstPersonName + ".";
                console.log(response.message);
                response.winner = 2;
                return response;
            }     
            //We're here means, no one has played 0 matches, and waiting time from last matches is same
            //Rule#3 Player with least number of matches gets the turn
            if(firstMatches < secondMatches) {
                response.message = firstPersonName + " should play. " +  "Both have been waiting for the same time however, " + firstPersonName + " has played lesser number of matches than " + secondPersonName + ".";
                console.log(response.message);
                response.winner = 1;
                return response;
            }
            else if(secondMatches < firstMatches)  {
                response.message = secondPersonName + " should play. " +  "Both have been waiting for the same time however, " + secondPersonName + " has played lesser number of matches than " + firstPersonName + ".";
                console.log(response.message);
                response.winner = 2;
                return response;
            }
            //We're here means, no one has played 0 matches, waiting time from last matchs are same, and both have played same number of matches
            // Rule#4 Who ever came first, gets the turn
            if(firstCameFirst) {
                response.message = firstPersonName + " should play. " +  "Both hava played same number of matches, have been waiting for same duration however, " + firstPersonName + "came first .";
                console.log(response.message);
                response.winner = 1;
                return response;
            } else if(secondCameFirst) {
                response.message = secondPersonName + " should play. " +  "Both hava played same number of matches, have been waiting for same duration however, " + secondPersonName + "came first ..";
                console.log(response.message);
                response.winner = 2;
                return response;
            }            
            return response;
        }
        $("#findOut").click(function() {
            console.log("Clicked");
            // if(firstPersonName.val().trim() == '' || secondPersonName.val().trim() == '' ) {
            //     alert("Enter names");
            //     return false;
            // }
            var winResponse = calculateWinner();
            console.log("winResponse", winResponse);
            if(winResponse.winner == -1) {
                alert(winResponse.message);
                return;
            }
            alert(winResponse.message);            
        });
    });
})();