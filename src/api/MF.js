const randomInt = (lim) => {
    return Math.floor(Math.random() * Math.floor(lim));
}

const createRandomMatrix = (n,m) => {
    var ret = new Array(n); 
    for (let i=0;i<n;i++) ret[i] = new Array(m);
    for (let i=0;i<n;i++)
        for (let j=0;j<m;j++) 
            ret[i][j] = randomInt(100000000)/100000000;
    
    return ret;     
}

const T = (arr,n,m) => {
    var ret = new Array(m); 
    for (let i=0;i<m;i++) ret[i] = new Array(n);
    for (let i=0;i<n;i++) 
        for (let j=0;j<m;j++)
            ret[j][i] = arr[i][j];
    return ret;
}

const matrix_mul = (A,B,K,N,M) => {
    var ret = new Array(N); 
    for (let i=0;i<N;i++) ret[i] = new Array(M);

    for (let i=0;i<N;i++)
        for (let j=0;j<M;j++) {
            ret[i][j] = 0;
            for (let k=0;k<K;k++) ret[i][j] += A[i][k] * B[k][j];
        }

    return ret;
}

const matrix_factorization = (R,K,N,M) => {
    var P = createRandomMatrix(N,K); 
    var Q = createRandomMatrix(M,K);

    var alpha = 0.02;
    var beta = 0.002;
    var epsilon = 0.0001;

    Q = T(Q,M,K);
    while (true) {
        for (let i=0;i<N;i++)
            for (let j=0;j<M;j++) 
                if (R[i][j] > 0) {
                    var Eij = R[i][j];
                    for (let t=0;t<K;t++) Eij -= P[i][t]*Q[t][j];
                    for (let t=0;t<K;t++) {
                        P[i][t] += alpha * (2 * Eij * Q[t][j] - beta * P[i][t]);
                        Q[t][j] += alpha * (2 * Eij * P[i][t] - beta * Q[t][j]);
                    }
                }
        var e = 0; 
        for (let i=0;i<N;i++)
            for (let j=0;j<M;j++) 
                if (R[i][j]>0) {
                    
                    var curr = R[i][j]; 
                    for (let t=0;t<K;t++) curr -= P[i][t]*Q[t][j] 
                    e = e + curr*curr; 
                }
        if (e<epsilon) break;
    }

    return matrix_mul(P,Q,K,N,M);

}

var N = 3; //number user
var M = 6; //number movies
var K = 20; //features size 

var R = new Array(N);
for (let i=0;i<N;i++) R[i] = new Array(M); 
for (let i=0;i<N;i++) {
    var x1 = randomInt(M);
    var x2 = randomInt(M);
    for (let j=0;j<M;j++) {
        if (j==x1 || j==x2) {
            R[i][x1] = 0;
            R[i][x2] = 0;
            continue;
        }
        R[i][j] = randomInt(11);
    }
}


var nR = matrix_factorization(R,K,N,M);
console.log(R);
console.log(nR);



