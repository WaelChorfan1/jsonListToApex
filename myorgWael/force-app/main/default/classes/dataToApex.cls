public class dataToApex {
 @AuraEnabled
 public static string insertList(List < MySObj__c > myList) {
  try {
   insert myList;
  } catch (DmlException e) {
   System.debug(Logginglevel.ERROR, e.getMessage());
   throw new AuraHandledException(e.getMessage());
  }
  return null;
 }

 @AuraEnabled
 public static string deleteAll() {

  try {
   List < MySObj__c > myList = [select Id from MySObj__c ];
	 delete myList;
  } catch (DmlException e) {

   System.debug(Logginglevel.ERROR, e.getMessage());
   throw new AuraHandledException(e.getMessage());
  }
  return null;
 }
}