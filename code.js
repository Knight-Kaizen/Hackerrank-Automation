module.exports = {
    answers : [
        `#include<bits/stdc++.h>
         using namespace std;
         
         int main(){
            int n;
            cin >> n;
            vector<int>arr(n);
            int ans = 0;
            for(int i =0; i<n; i++){
                cin >> arr[i];
                ans += arr[i];
            }
            cout << ans;
            return 0;
         }   
        `
    ]
}